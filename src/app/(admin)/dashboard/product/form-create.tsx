// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "~/components/ui/form";

// import Loading from "~/common/components/loading";
// import { CloudinaryUtil } from "~/common/utility/cloudinary.util";
// import IconTextLoading from "~/common/components/icon-text-loading";
// import {
//   ProductShema,
//   ProductShemaType,
// } from "~/app/schema-validations/product.shema";
// import { Separator } from "~/components/ui/separator";
// import { CategorySelect } from "./category-select";
// import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
// import { ProductPost } from "~/modules/product/models/ProductPost";
// import { BaseUtil } from "~/common/utility/base.util";
// import { ImagePreviewUploader } from "~/common/components/image/image-preview-uploader";

// interface Props {
//   createProduct: (productPost: ProductPost) => any;
// }

// export function FormCreate({ createProduct }: Props) {
//   const [open, setOpen] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
//     null
//   );

//   const form = useForm<ProductShemaType>({
//     resolver: zodResolver(ProductShema),
//     defaultValues: {
//       name: "",
//       price: undefined,
//       material: "",
//       style: "",
//       imageUrl: "",
//       stock: undefined,
//       category: { id: 0, name: "" },
//     },
//   });

//   useEffect(() => {
//     if (imageSelected) {
//       const imageUrl = URL.createObjectURL(imageSelected);
//       form.setValue("imageUrl", imageUrl);
//     }
//   }, [imageSelected]);

//   const onSubmit = async ({
//     name,
//     price,
//     material,
//     style,
//     imageUrl,
//     category,
//   }: ProductShemaType) => {
//     console.log(123123);

//     setLoading(true);

//     try {
//       // handle upload image and get url
//       if (imageSelected) {
//         imageUrl = await CloudinaryUtil.handleUploadImage(imageSelected);
//       }

//       const productPost: ProductPost = {
//         name,
//         price,
//         material,
//         style,
//         categoryId: category.id,
//         imageUrl: imageUrl,
//       };
//       console.log(productPost);

//       await createProduct(productPost);
//       setOpen(false);
//     } catch (error) {
//       BaseUtil.handleErrorApi({ error });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       {loading && <Loading />}
//       <DialogTrigger asChild className="p-1.5 mx-4 rounded-sm">
//         <Button
//           variant={"default"}
//           className="text-sm cursor-pointer"
//           onClick={() => setOpen(true)}
//         >
//           Thêm sản phẩm
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="bg-gray-100 py-2 sm:max-w-[1025px]">
//         <DialogHeader>
//           <DialogTitle>Thêm sản phẩm</DialogTitle>
//         </DialogHeader>
//         <div className="grid grid-cols-6 space-x-16">
//           <div className="col-span-1 flex flex-col space-y-4">
//             {/* <div className="bg-muted mx-auto w-full bg-gray-100 aspect-square relative">
//               <Image
//                 src={
//                   imagePreview ? imagePreview : "/assets/product-default.jpg"
//                 }
//                 alt="image"
//                 fill
//                 sizes="100"
//                 className="rounded-md object-cover"
//               />
//             </div>
//             <div className="flex flex-col items-center">
//               <input
//                 id="chooseimage"
//                 type="file"
//                 accept="png, jpeg"
//                 onChange={handlePerviewimage}
//                 className="border sr-only"
//               />
//               <label htmlFor="chooseimage" className="mt-8 mb-4 cursor-pointer">
//                 <span className="px-4 py-1 border border-gray-500 rounded-full">
//                   Chọn ảnh
//                 </span>
//               </label>
//               <span className="text-xs text-gray-500">
//                 Định dạng: PNG, JPEG
//               </span>
//               <p className="mt-2 text-sm font-medium text-destructive">
//                 {form.formState.errors.imageUrl &&
//                   form.formState.errors.imageUrl.message}
//               </p>
//             </div> */}
//             <ImagePreviewUploader
//               imageSelected={imageSelected}
//               setImageSelected={setImageSelected}
//               form={form}
//             />
//           </div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="col-span-5 space-y-4"
//             >
//               <CategorySelect form={form} />
//               <div className="bg-white border rounded-sm">
//                 <h3 className="p-2">Chi tiết sản phẩm</h3>
//                 <Separator />
//                 <div className="p-4 grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem className="">
//                         <FormLabel>Tên sản phẩm:</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage className="text-xs" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="category.name"
//                     render={({ field }) => (
//                       <FormItem className="">
//                         <FormLabel>Danh mục sản phẩm:</FormLabel>
//                         <FormControl>
//                           <Input {...field} disabled />
//                         </FormControl>
//                         <FormMessage className="text-xs" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="material"
//                     render={({ field }) => (
//                       <FormItem className="">
//                         <FormLabel>Chất liệu:</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage className="text-xs" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="style"
//                     render={({ field }) => (
//                       <FormItem className="">
//                         <FormLabel>Phong cách:</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage className="text-xs" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem className="">
//                         <FormLabel>Giá:</FormLabel>
//                         <FormControl>
//                           <Input type="number" {...field} />
//                         </FormControl>
//                         <FormMessage className="text-xs" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="stock"
//                     render={({ field }) => {
//                       return (
//                         <FormItem className="">
//                           <FormLabel>Số lượng:</FormLabel>
//                           <FormControl>
//                             <Input type="number" {...field} />
//                           </FormControl>
//                           <FormMessage className="text-xs" />
//                         </FormItem>
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </div>
//         <DialogFooter>
//           {loading ? (
//             <Button variant={"outline"}>
//               <IconTextLoading />
//             </Button>
//           ) : (
//             <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
//               Thêm sản phẩm
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
