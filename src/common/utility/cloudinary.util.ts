import { FileWithPreview } from "~/modules/common/model/FileWithPreview";

export class CloudinaryUtil {
  static handleUploadImage = async (
    file: FileWithPreview | null
  ): Promise<string> => {
    // if no image is selected, get user's default image
    if (!file) {
      return "";
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wrzjwiuv");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwq0fi0sc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.secure_url;
    }
    return "";
  };
}
