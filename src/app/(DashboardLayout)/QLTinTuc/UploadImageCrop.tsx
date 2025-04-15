import { uploadFileService } from '@/services/File/uploadFile.service';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const validFileTypes = ['image/png', 'image/jpeg'];

type FileUploaderProps = {
    maxFiles?: number;
    setUploadedData: React.Dispatch<React.SetStateAction<string[]>>;
    type?: string;
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    fileList: UploadFile[];
    existingImageUrl?: string | null
};

const UploadImageCrop: React.FC<FileUploaderProps> = ({
    maxFiles = 2,
    setUploadedData,
    type,
    setFileList,
    fileList,
    existingImageUrl,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [currentFile, setCurrentFile] = useState<UploadFile | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(1); // Tỷ lệ cắt mặc định là 1:1
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const imageToShow = croppedImage || existingImageUrl || imageSrc;

    // Xử lý chọn file
    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList].slice(-maxFiles);

        newFileList = newFileList.map((file) => {
            const isValid = file.type && validFileTypes.includes(file.type);
            if (!isValid) {
                file.status = 'error';
                file.error = 'File tải lên không hợp lệ';
            }
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);
    };

    // Khi nhấn vào file để mở modal crop
    const handleFileClick = (file: UploadFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target?.result as string);
            setIsModalVisible(true);
            setCurrentFile(file);
        };
        reader.readAsDataURL(file.originFileObj as Blob);
    };

    // Khi modal mở
    const handleModalOpen = () => {
        if (imageRef.current && !cropperRef.current) {
            cropperRef.current = new Cropper(imageRef.current, {
                aspectRatio: aspectRatio, // Sử dụng tỷ lệ cắt từ trạng thái
                viewMode: 2,
                preview: '.preview',
            });
        }
    };

    // Cập nhật tỷ lệ cắt khi người dùng chọn
    const handleAspectRatioChange = (ratio: number) => {
        setAspectRatio(ratio);
        if (cropperRef.current) {
            cropperRef.current.setAspectRatio(ratio);
        }
    };

    // Xử lý cắt ảnh
    const handleCrop = async () => {
        // Kiểm tra cropper và imageRef trước khi cắt
        if (cropperRef.current && imageRef.current) {
            const canvas = cropperRef.current.getCroppedCanvas();
            if (canvas) {
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        const croppedFile = new File([blob], 'cropped-image.png', { type: 'image/png' });

                        // Tạo FormData để gửi lên server
                        const formData = new FormData();
                        formData.append('Files', croppedFile);
                        formData.append('FileType', type ?? '');

                        try {
                            const result = await uploadFileService.upload(formData);
                            if (result.message === 'Success' && result.data != null) {
                                setUploadedData((prev) => [result.data[0].id, ...(prev || [])]);
                                setFileList((prev) =>
                                    prev.map((file) =>
                                        file.uid === currentFile?.uid ? { ...file, status: 'done' } : file
                                    )
                                );
                                const url = URL.createObjectURL(blob);
                                setCroppedImage(url);
                            }
                        } catch (error) {
                            console.error('Upload error:', error);
                        }
                    }
                }, 'image/png');

                // Hủy Cropper sau khi cắt ảnh
                cropperRef.current.destroy();
                cropperRef.current = null;

            }
            setIsModalVisible(false);
        } else {
            console.error('Cropper or image is not ready');
        }
    };

    // Xử lý khi hủy modal
    const handleCancel = () => {
        // Xóa file cũ trong fileList
        if (currentFile) {
            setFileList((prev) => prev.filter((file) => file.uid !== currentFile?.uid));
            setUploadedData((prev) => prev.filter((id) => id !== currentFile?.uid));
        }

        // Reset lại các state liên quan đến ảnh
        setImageSrc(null);
        setCurrentFile(null);

        // Hủy Cropper nếu có
        if (cropperRef.current) {
            cropperRef.current.destroy();
            cropperRef.current = null;
        }

        setIsModalVisible(false);
    };

    // Xóa ảnh khỏi fileList
    const handleDelete = (uid: string) => {
        console.log('Deleting file with uid:', uid); // Log thêm để debug
        setFileList((prev) => {
            const newFileList = prev.filter((file) => file.uid !== uid);
            console.log('Updated fileList:', newFileList); // Kiểm tra fileList sau khi xóa
            return newFileList;
        });
        setUploadedData((prev) => {
            const newData = prev.filter((id) => id !== uid);
            console.log('Updated uploadedData:', newData); // Kiểm tra uploadedData sau khi xóa
            return newData;
        });
    };

    const props = {
        customRequest: async (options: any) => {
            const { file, onSuccess, onError } = options;
            const reader = new FileReader();

            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
                setIsModalVisible(true);
                setCurrentFile(file);
            };
            reader.readAsDataURL(file);
        },
        onChange: handleChange,
        multiple: false,
        // itemRender: (originNode: React.ReactNode, file: UploadFile) => {
        //     return (
        //         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        //             {originNode}
        //             <Button
        //                 icon={<DeleteOutlined />}
        //                 size="small"
        //                 onClick={() => handleDelete(file.uid)} // Xóa ảnh khi click thùng rác
        //             />
        //         </div>
        //     );
        // },
    };

    return (
        <>
            <Upload {...props} fileList={fileList} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>

            <Modal
                title="Cắt ảnh"
                open={isModalVisible}
                onCancel={handleCancel} // Gọi handleCancel để hủy và xóa file
                onOk={handleCrop}
            >
                {imageSrc && (
                    <>
                        <img ref={imageRef} src={imageSrc} alt="Ảnh cần cắt" style={{ maxWidth: '100%' }} onLoad={handleModalOpen} />
                        
                        {/* Các nút chọn tỷ lệ cắt */}
                        <div style={{ marginTop: '10px' }}>
                            <Button onClick={() => handleAspectRatioChange(1)} style={{ marginRight: '10px' }}>
                                1:1
                            </Button>
                            <Button onClick={() => handleAspectRatioChange(4 / 3)} style={{ marginRight: '10px' }}>
                                4:3
                            </Button>
                            <Button onClick={() => handleAspectRatioChange(16 / 9)} style={{ marginRight: '10px' }}>
                                16:9
                            </Button>
                            <Button onClick={() => handleAspectRatioChange(3 / 2)} style={{ marginRight: '10px' }}>
                                3:2
                            </Button>
                            <Button onClick={() => handleAspectRatioChange(0)} style={{ marginRight: '10px' }}>
                                Tự do
                            </Button>
                        </div>
                    </>
                )}
            </Modal>

            {imageToShow  && (
                <div style={{ marginTop: '20px' }}>
                    <img src={imageToShow} alt="Cắt ảnh" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </>
    );
};

export default UploadImageCrop;
