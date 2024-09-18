import React, { useState, useEffect } from 'react';
import './App.css';

const ImageResizer = () => {
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [percentage, setPercentage] = useState('');
    const [quality, setQuality] = useState(80);
    const [resizedImage, setResizedImage] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const title = document.querySelector('.title');
        let text = title.textContent;
        title.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }, []);

    // Bu useEffect, width ve height değerleri girildiğinde percentage'ı sıfırlar.
    useEffect(() => {
        if (width || height) {
            setPercentage('');
        }
    }, [width, height]);

    // Bu useEffect, percentage girildiğinde width ve height'ı sıfırlar.
    useEffect(() => {
        if (percentage) {
            setWidth('');
            setHeight('');
        }
    }, [percentage]);

    useEffect(() => {
        if ((width && height) || percentage) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [width, height, percentage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setResizedImage(null);
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
                targetWidth = (parseInt(percentage, 10) * img.width) / 100;
                targetHeight = (parseInt(percentage, 10) * img.height) / 100;
            } else {
                targetWidth = img.width;
                targetHeight = img.height;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
            setResizedImage(compressedDataUrl);
        };

        img.src = image;
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = resizedImage;
        link.download = 'compressed_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <h1 className="title">Görüntüyü yeniden boyutlandır</h1>

            <div className="image-upload">
                <label htmlFor="imageInput" className="upload-label">
                    <i className="fas fa-cloud-upload-alt"></i> Görüntüyü yükle
                </label>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={(e) => {
                        console.log("Dosya seçildi");
                        handleImageChange(e);
                    }}
                    style={{ display: 'none' }}
                />
            </div>

            {image && (
                <div id="action-form" className="left-aligned">
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
                            <label htmlFor="resizeHeight">Boy:</label>
                            <input
                                type="number"
                                id="resizeHeight"
                                placeholder="Boy giriniz"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div className="control-group">
                            <label htmlFor="resizePercentage">Yüzde ile boyutlandır:</label>
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
                            <span id="quality-value">{quality}</span>
                        </div>

                        <div id="thumbnail-preview">
                            <img src={image} alt="Thumbnail" />
                            <button id="remove-thumbnail" className="close-button" onClick={() => setImage(null)}>×</button>
                        </div>

                        <button id="resizeButton" onClick={handleResizeAndCompress} disabled={isButtonDisabled}>
                            Boyutlandır
                        </button>
                    </div>
                </div>
            )}

            {resizedImage && (
                <div id="result-card" className="result-card active">
                    <button id="close-result" className="close-button" onClick={() => setResizedImage(null)}>×</button>
                    <img id="preview" src={resizedImage} alt="Preview" />
                    <a id="downloadButton" href={resizedImage} download="compressed_image.jpg" onClick={handleDownload}>
                        İndir
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageResizer;
