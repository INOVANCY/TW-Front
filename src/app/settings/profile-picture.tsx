import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import ProfileService from "@/services/ProfileService";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Flip {
  horizontal: boolean;
  vertical: boolean;
}

export function ProfilePictureCropper() {
  // State
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Toaster
  const { toast } = useToast();

  // Profile picture
  const fileInputRef = useRef<HTMLInputElement>(null);

  // On input select file
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
    }
  };

  // Cancel profile picture change
  const cancelProfilePictureChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImageSrc(undefined);
  };

  // On crop complete
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Send cropped image to server

  const sendCroppedImage = async () => {
    setIsLoading(true);
    // Generate blob from cropped image
    if (imageSrc === undefined) {
      toast({
        title: "Oh snap!",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation
    );

    // Transform blob to file
    if (croppedImage === null) {
      toast({
        title: "Oh snap!",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const response = await fetch(croppedImage);
    const blob = await response.blob();
    const file = new File([blob], "profile-picture.png", {
      type: "image/png",
    });
    const formData = new FormData();
    formData.append("picture", file);

    // Send file to server
    console.log(new Date());
    ProfileService.updateProfilePicture(formData)
      .then((response) => {
        toast({
          title: "Oh parfait!",
          description: "Votre photo de profil a été mise à jour.",
        });
        if (response.data.fileName && user) {
          setUser({
            ...user,
            profilePicture: response.data.fileName,
          });
        }
        cancelProfilePictureChange();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Oh snap!",
          description: "Une erreur s'est produite. Veuillez réessayer.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        id="profilepicture"
        onChange={onFileChange}
        ref={fileInputRef}
      />
      <Dialog open={imageSrc !== undefined}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rogner votre photo de profil</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[400px] bg-card">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              aspect={1 / 1}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Label htmlFor="zoom">Zoom</Label>
            <Slider
              id="zoom"
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={1}
              max={10}
              step={0.1}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => cancelProfilePictureChange()}
            >
              Annuler
            </Button>
            <Button onClick={() => sendCroppedImage()} disabled={isLoading}>
              {isLoading && <Loader size={18} />} Changer la photo de profil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation = 0,
  flip: Flip = { horizontal: false, vertical: false }
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        reject(new Error("Canvas toBlob failed"));
      }
    }, "image/png");
  });
}

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
