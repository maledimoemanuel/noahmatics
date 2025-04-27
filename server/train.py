import json
from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer
)

# 1. Load your data
with open("dataset.json") as f:
    examples = json.load(f)
dataset = Dataset.from_list(examples)
# split 80/20
splits = dataset.train_test_split(test_size=0.2)
train_ds, eval_ds = splits["train"], splits["test"]

# 2. Load model & tokenizer
MODEL_NAME = "google/flan-t5-small"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

# 3. Tokenization helper
def preprocess(batch):
    inp = tokenizer(batch["prompt"], truncation=True, padding="longest")
    tgt = tokenizer(batch["response"], truncation=True, padding="longest")
    batch["input_ids"] = inp.input_ids
    batch["attention_mask"] = inp.attention_mask
    batch["labels"] = tgt.input_ids
    return batch

train_ds = train_ds.map(preprocess, batched=True, remove_columns=["prompt","response"])
eval_ds  = eval_ds.map(preprocess,  batched=True, remove_columns=["prompt","response"])

# 4. Training arguments
args = Seq2SeqTrainingArguments(
    output_dir="./fine-tuned-model",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    weight_decay=0.01,
    save_total_limit=1,
    num_train_epochs=5,
    predict_with_generate=True,
    logging_steps=10
)

# 5. Trainer
trainer = Seq2SeqTrainer(
    model=model,
    args=args,
    train_dataset=train_ds,
    eval_dataset=eval_ds,
    tokenizer=tokenizer,
)

# 6. Train
trainer.train()

# 7. Save
model.save_pretrained(args.output_dir)
tokenizer.save_pretrained(args.output_dir)
