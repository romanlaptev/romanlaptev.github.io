import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { Upload, message, Icon } from 'antd';



const props = {
  name: 'file',
  //action: '//jsonplaceholder.typicode.com/posts/',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class ServiceModal extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
console.log(e);

var userDataUrl = document.querySelector("#user-data-url");
//console.log(userDataUrl);
userDataUrl.value="";
	
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
console.log(e);

var userDataUrl = document.querySelector("#user-data-url");
//console.log(userDataUrl);
userDataUrl.value="";

    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="btn-violet" onClick={this.showModal}>Service</Button>
        <Modal
          title="Specify data file"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

			<label>URL:</label>
			<Input id="user-data-url" name="data_url" placeholder="paste url" autoComplete="off"/>
			
          <p>http://graphic-art-collection.16mb.com/wp-content/uploads/lib.json</p>
          <p>http://graphic-art-collection.16mb.com/wp-content/uploads/bookmarks-2014-10-06.json</p>
          <p>https://romanlaptev.github.io/projects/bookmarks/db/lib.json</p>

		  <Upload {...props}>
			<Button>
			  <Icon type="upload" />Select local JSON file
			</Button>
		  </Upload>
          
        </Modal>
      </div>
    );
  }
}

export default ServiceModal;
