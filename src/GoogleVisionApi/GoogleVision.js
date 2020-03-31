import React, {Component} from 'react';
import axios from 'axios';
import BarChart from "./BarChart";
import 'bootstrap/dist/css/bootstrap.min.css';
import './googleVision.css';

export default class GoogleVision extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageBase64: '',
            show: false,
        };
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-1 text-center mt-3 mb-5">Image Vision</h1>
                <input id="imageUpload" type="file" onChange={this.handleImageChange}
                       accept="image/png, image/jpeg" className="uploadImage"/>
                <div className="row justify-content-center">
                    <input type="button" value="Upload image" onClick={this.uploadImage}
                           className="btn btn-primary"/>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-6">
                        <img src={this.state.image} alt="" className="img-responsive imagePreview"/>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col">
                        {this.state.show && <BarChart values={this.state.imageInfo} labels={this.state.imageLabels}/>}
                    </div>
                </div>
            </div>
        );
    }

    uploadImage = () => {
        document.getElementById('imageUpload').click();
    };

    handleImageChange = (e) => {
        this.setState({show: false});
        let file = e.target.files[0];
        this.setState({image: URL.createObjectURL(file)});
        let reader = new FileReader();
        let self = this;

        reader.onload = function (r) {
            self.setState({imageBase64: r.target.result.split(',')[1]});
            self.checkImage();
        };

        reader.readAsDataURL(file);
    };

    checkImage = () => {
        let data =
            {
                "requests":
                    [
                        {
                            "image": {
                                "content": this.state.imageBase64
                            },
                            "features": [
                                {
                                    "type": "LABEL_DETECTION",
                                    "maxResults": 5
                                }
                            ]
                        }
                    ]
            };

        axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCfVoRkmRpvFHU-XyMihGn2LW0w6QRGBQ4', data)
            .then(res => {
                console.log(res.data.responses[0].labelAnnotations);

                let imageValues = [];
                let imageLabels = [];

                res.data.responses[0].labelAnnotations.forEach(e => {
                    imageValues.push(Math.round(((e.score * 100) + Number.EPSILON) * 100) / 100);
                    imageLabels.push(e.description);
                });

                this.setState({imageInfo: imageValues, imageLabels: imageLabels, show: true});
            })
    }

}
