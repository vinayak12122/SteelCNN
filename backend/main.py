import io
import time
import torch
import torch.nn.functional as F
import uvicorn

from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from torchvision import transforms

from model import SteelCNN

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

CLASS_NAMES = [
    "crazing",
    "inclusion",
    "patches",
    "pitted_surface",
    "rolled-in_scale",
    "scratches",
]

model = SteelCNN(num_classes=len(CLASS_NAMES))
model.load_state_dict(torch.load("model/best_steel_model.pt", map_location=device))
model.to(device)
model.eval()

test_transform = transforms.Compose([
    transforms.Resize((200, 200)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    start_time = time.perf_counter()

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert('L')

    tensor = test_transform(image).unsqueeze(0).to(device)

    with torch.inference_mode():
        logits = model(tensor)
        prob = F.softmax(logits, dim=1)[0]
        confidence, pred_idx = torch.max(prob, dim=0) 

    predicted_class = CLASS_NAMES[pred_idx.item()]
    conf_score = confidence.item() * 100

    class_probabilities = {
        CLASS_NAMES[i]: round(prob[i].item() * 100, 2)
        for i in range(len(CLASS_NAMES))
    }

    inference_time = (time.perf_counter() - start_time) * 1000

    return {
        "success": True,
        "prediction": {
            "class": predicted_class,
            "confidence": round(conf_score, 2),  
        },
        "probabilities": class_probabilities,
        "image": { 
            "original_filename": file.filename,
            "content_type": file.content_type,
            "input_size": "200x200",
            "channels": 1,
        },
        "model": {
            "name": "SteelCNN",
            "classes": len(CLASS_NAMES),
            "device": str(device),
        },
        "inference": {
            "time_ms": round(inference_time, 2),
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
