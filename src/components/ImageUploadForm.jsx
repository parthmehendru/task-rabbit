import React from 'react';
import axios from 'axios';

class ImageUploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null};
        
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileChange(event) {
        this.setState({ file: event.target.files[0]});

    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.file);

        axios.post('/api/upload', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleFileChange} />
                <button type="subimt">Upload</button>
            </form>
        )
    }
}

export default ImageUploadForm;