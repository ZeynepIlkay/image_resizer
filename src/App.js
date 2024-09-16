// Imageresizer.js

import React, {
  useState
} from 'react';


const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quality, setQuality] = useState(80);
  

  return (
      <div className="container">
          <h1 className="title">
              Görüntü Boyutlandırıcı
          </h1>

          <div className="image-upload">
              <label htmlFor="imageInput"
                  className="upload-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  Görüntü yükle :
              </label>
              <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  
              />
          </div>

          {image && (
              <div id="action-form">
                  <div className="output">
                      <h2 className="preview-label">Preview:</h2>
                      <img id="preview" src={image} alt="Preview" />
                      <p id="image-dimensions" style={{
                          marginTop: '10px'
                      }}>
                      </p>
                  </div>

                  <div className="controls">
                      <div className="control-group">
                          <label htmlFor="resizeWidth">En:</label>
                          <input
                              type="number"
                              id="resizeWidth"
                              placeholder="Width"
                              value={width}
                              
                          />
                      </div>
                      <div className="control-group">
                          <label htmlFor="resizeHeight">Boy:</label>
                          <input
                              type="number"
                              id="resizeHeight"
                              placeholder="Height"
                              value={height}
                              
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
                              
                          />
                          <span id="quality-value" className="quality-value">
                              {quality}
                          </span>
                      </div>
                      <button id="resizeButton"
                          >
                          Yeniden boyutlandır
                      </button>
                      {image && (
                          <a
                              id="downloadButton"
                              className="download-button"
                              href={image}
                              download="compressed_image.jpg"
                              
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

