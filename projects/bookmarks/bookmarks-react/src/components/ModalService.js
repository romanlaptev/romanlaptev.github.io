import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { Upload, message, Icon } from 'antd';

import {dataStore} from "./DataStore";
import * as utils from "../utils";

//https://ant.design/components/modal/
//https://ant.design/components/upload/

const props = {
	//name: 'file',//The name of uploading file
	//action: '//jsonplaceholder.typicode.com/posts/',
	//headers: {
    //authorization: 'authorization-text',
	//},
	
	//showUploadList: true,
	
	onPreview(){
console.log("onPreview....", arguments);
	},
	
	onChange(info) {
console.log("onChange....", arguments);
console.log("info: ", info);
/*
		if (info.file.status !== 'uploading') {
console.log(info.file, info.fileList);
		}
		
		if (info.file.status === 'done') {
		  message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
		  message.error(`${info.file.name} file upload failed.`);
		}
*/
		if( window.FileList ){
			utils.parseLocalFile( info["file"] );
		} else {
			dataStore.logMsg = "Your browser does not support File API";
			//_log("<div class='alert alert-warning'>" + webApp.logMsg + "</div>");
			message.error(dataStore.logMsg);
		}
		
		dataStore.components.ServiceModal.setState({
		  visible: false
		});
//console.log("TEST: ", ServiceModal);
		
	},//end onChange

	onRemove: (file) => {
console.log("onRemove....");		
	},

	beforeUpload: (file) => {
console.log("beforeUpload....", file);		
		return false;
	},
  
};//end props


class ServiceModal extends Component {
	
	constructor( props ){
//console.log("class ServiceModal, constructor", props);
		super(props);
		
		this.state = {
			visible: false
		};

		dataStore.components["ServiceModal"] = this;
	};//end constructor
		
  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleOk = (e) => {
//console.log(e);

	var userDataUrl = document.querySelector("#user-data-url");
//console.log(userDataUrl);
	
	dataStore["dataUrl"] = userDataUrl.value;
	utils.urlManager( dataStore.initUrl );
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
          okText="Parse file"
          cancelText="Close"
        >

			<label>URL:</label>
			<Input id="user-data-url" name="data_url" placeholder="paste url" autoComplete="off"/>
			
<p>http://graphic-art-collection.16mb.com/wp-content/uploads/lib.json</p>
<p>http://graphic-art-collection.16mb.com/wp-content/uploads/bookmarks-2014-10-06.json</p>
<p>https://romanlaptev.github.io/projects/bookmarks/db/lib.json</p>
<p>http://localhost/www/bookmarks/db/bookmarks.json</p>
<p>../../db/bookmarks.json</p>
			<div>
				<Upload {...props}>
					<Button>
						<Icon type="upload" />Select local JSON file
					</Button>
				</Upload>
			</div>

        </Modal>
      </div>
    );
  }
}

export default ServiceModal;

/*
import { Upload, Button, Icon, message } from 'antd';
import reqwest from 'reqwest';

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: '//jsonplaceholder.typicode.com/posts/',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
*/
