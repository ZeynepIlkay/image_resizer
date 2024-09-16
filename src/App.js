// Imageresizer.js

import React, {
    useState
} from 'react';
import './App.css';

const ImageResizer = () => {
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [percentage, setPercentage] = useState('');
    const [quality, setQuality] = useState(80);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResizeAndCompress = () => {
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let targetWidth, targetHeight;

            if (width && height) {
                targetWidth = parseInt(width, 10);
                targetHeight = parseInt(height, 10);
            } else if (percentage) {
                targetWidth = (parseInt(
                    percentage, 10) * img.width) / 100;
                targetHeight = (parseInt(
                    percentage, 10) * img.height) / 100;
            } else {
                targetWidth = img.width;
                targetHeight = img.height;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const compressedDataUrl = canvas.toDataURL(
                'image/jpeg', quality / 100);
            setImage(compressedDataUrl);
        };
        img.src = image;
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = 'compressed_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <h1 className="title">
                Görüntüyü yeniden boyutlandır
            </h1>

            <div className="image-upload">
                <label htmlFor="imageInput"
                    className="upload-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    Görüntüyü yükle  : 
                </label>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {image && (
                <div id="action-form">
                    <div className="output">
                        <h2 className="preview-label">Görüntü:</h2>
                        <div className="controls">
                        <div className="control-group">
                            <label htmlFor="resizeWidth">En:</label>
                            <input
                                type="number"
                                id="resizeWidth"
                                placeholder="En giriniz"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </div>
                        <div className="control-group">
                            <label htmlFor="resizeHeight">Boy giriniz:</label>
                            <input
                                type="number"
                                id="resizeHeight"
                                placeholder="Boy"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div className="control-group">
                            <label htmlFor="resizePercentage">
                                Yüzde ile boyutlandır:
                            </label>
                            <input
                                type="number"
                                id="resizePercentage"
                                placeholder="Yüzde giriniz"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                            />
                        </div>
                        <div className="control-group quality-group">
                            <label htmlFor="quality">Kalite:</label>
                            <input
                                type="range"
                                id="quality"
                                min="1"
                                max="100"
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                            />
                            <span id="quality-value" className="quality-value">
                                {quality}
                            </span>
                        </div>
                        <button id="resizeButton"
                            onClick={handleResizeAndCompress}>
                            Boyutlandır
                        </button>
                        <img id="preview" src={image} alt="Preview" />
                        <p id="image-dimensions" style={{
                            marginTop: '10px'
                        }}>
                        </p>
                    </div>

                    
                        {image && (
                            <a
                                id="downloadButton"
                                className="download-button"
                                href={image}
                                download="compressed_image.jpg"
                                onClick={handleDownload}
                            >
                                İndir
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageResizer;

