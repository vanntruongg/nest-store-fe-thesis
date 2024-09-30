export interface IProps {
  description?: string;
}

export function ProductDescription({ description }: IProps) {
  const partDescriptions = description
    ?.split(".")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <div className="flex gap-2">
      <span className="min-w-20 text-muted-foreground">Mô tả:</span>
      <div className="flex flex-col space-y-2">
        {partDescriptions &&
          partDescriptions.map((description, index) => (
            <span key={index}>- {description}.</span>
          ))}
      </div>
    </div>
  );
}
