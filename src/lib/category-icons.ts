import { Ghost, CircleDot, Swords, Puzzle, Car, Crosshair, Trophy, ChefHat, Shirt, Palette, GraduationCap, Heart, Layers, Dices, Footprints, HelpCircle, Compass, Globe, Grid2X2, Circle, Spade, Zap, Blocks, Monitor, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Horror: Ghost, Basketball: CircleDot, Battle: Swords, Strategy: Swords,
  Puzzle, Jigsaw: Puzzle, 'Racing & Driving': Car, Shooter: Crosshair,
  Sports: Trophy, Football: Circle, Cooking: ChefHat, 'Dress-up': Shirt,
  Art: Palette, Educational: GraduationCap, Care: Heart, Merge: Layers,
  Boardgames: Dices, Agility: Footprints, Quiz: HelpCircle, Adventure: Compass,
  '.IO': Globe, 'Mahjong & Connect': Grid2X2, 'Bubble Shooter': CircleDot,
  Cards: Spade, Casual: Zap, 'Match-3': Blocks, Simulation: Monitor,
};

export const categoryIcon = (name: string) => icons[name] ?? Grid2X2;