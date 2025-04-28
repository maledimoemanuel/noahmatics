import json
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

class TeachingBot:
    def __init__(self, model_name="microsoft/phi-2"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            device_map="auto",
            torch_dtype=torch.float16
        )
        self.pipe = pipeline("text-generation", model=self.model, tokenizer=self.tokenizer)

    def ask(self, user_input):
        system_prompt = """
You are a math tutor AI.
Respond ONLY in this JSON format:

{
  "explanation": "...",
  "katex": "...",
  "animation": "..."
}
        """
        prompt = f"{system_prompt}\n\nUser: {user_input}\nBot:"
        output = self.pipe(
            prompt,
            max_length=512,
            do_sample=True,
            temperature=0.3,
            top_p=0.9
        )[0]['generated_text']

        try:
            json_start = output.index('{')
            json_end = output.rindex('}') + 1
            json_text = output[json_start:json_end]
            response = json.loads(json_text)
        except Exception:
            response = {
                "explanation": "Sorry, I couldn't understand the output.",
                "katex": "",
                "animation": ""
            }
        
        return response
