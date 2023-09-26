import { Document, model, Schema } from "mongoose";


enum BlacklistKind {
    jti = "jti",
    refresh = "refresh",
    token = "token",
  }
  
// the previous codes for "blacklist.ts" go here
// and we continue the implementation down below

const BlacklistSchema = new Schema(
    {
      object: {
        type: String,
        required: [true, "Please provide an object"],
        unique: true,
      },
      kind: {
        type: String,
        enum: ["jti", "refresh", "token"],
        default: "jti",
        required: [true, "Please provide a kind"],
      },
    },
    { timestamps: true }
  );

// the previous codes for "blacklist.ts" go here
// and we continue the implementation down below

interface BlacklistDocument extends Document {
    object: string;
    kind: BlacklistKind;
  }
  
  export default model<BlacklistDocument>("Blacklist", BlacklistSchema);

