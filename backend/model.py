import torch
from torch import nn

class ResidualBlock(nn.Module):
    def __init__(self,channels):
        super().__init__()
        self.block = nn.Sequential(

            # First CNN
            nn.Conv2d( channels, channels, kernel_size=3, padding=1, bias=False ),
            nn.BatchNorm2d(channels),
            nn.SiLU(),

            # Second CNN
            nn.Conv2d(channels,channels,kernel_size=3,padding=1,bias=False),
            nn.BatchNorm2d(channels)
        )

        self.act = nn.SiLU()

    def forward(self,x):
        return self.act(x + self.block(x))

class SteelCNN(nn.Module):
    def __init__(self,num_classes):
        super().__init__()

        # First Layer - Low Level Features
        self.stage1 = nn.Sequential(
            nn.Conv2d(1,32,kernel_size=3,padding=1,bias=False),
            nn.BatchNorm2d(32),
            nn.SiLU(),
            ResidualBlock(32),
            nn.MaxPool2d(kernel_size=2,stride=2) # 100 x 100
        )

        # Second Layer - Mid Level Features
        self.stage2 = nn.Sequential(
            nn.Conv2d(32,64,kernel_size=3,padding=1,bias=False),
            nn.BatchNorm2d(64),
            nn.SiLU(),
            ResidualBlock(64),
            nn.MaxPool2d(kernel_size=2,stride=2), # 50 x 50
        )

        # Third Layer - High Level Features
        self.stage3 = nn.Sequential(
            nn.Conv2d(64,128,kernel_size=3,padding=1,bias=False),
            nn.BatchNorm2d(128),
            nn.SiLU(),
            ResidualBlock(128),
            nn.MaxPool2d(kernel_size=2,stride=2) # 25 x 25
        )

        # Fourth Layer - High-level Semantic Representation
        self.stage4 = nn.Sequential(
            nn.Conv2d(128,256,kernel_size=3,padding=1,bias=False),
            nn.BatchNorm2d(256),
            nn.SiLU(),
            ResidualBlock(256),
            nn.MaxPool2d(kernel_size=2,stride=2)
        )

        # Handles Flexible Size Images by Flattening from n x n to 1 x 1
        self.global_pool = nn.AdaptiveAvgPool2d((1,1))

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(p=0.3),
            nn.Linear(256,128),
            nn.SiLU(),
            nn.Dropout(p=0.2),
            nn.Linear(128,num_classes)
        )

    def forward(self,x):
        x = self.stage1(x)
        x = self.stage2(x)
        x = self.stage3(x)
        x = self.stage4(x)
        x = self.global_pool(x)
        return self.classifier(x)