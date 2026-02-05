import mongoose, { Schema, Model } from "mongoose";
import { Tournament } from "@/types/tournament";

const tournamentSchema = new Schema<Tournament>(
  {
    tournament_id_lichess: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "El título es requerido"],
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "La ubicación es requerida"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "La fecha de inicio es requerida"],
    },
    endDate: {
      type: Date,
      required: [true, "La fecha de fin es requerida"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [
        {
          public_id: { type: String, required: true },
          secure_url: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const TournamentModel: Model<Tournament> =
  mongoose.models.Tournament ||
  mongoose.model<Tournament>("Tournament", tournamentSchema);

export default TournamentModel;
