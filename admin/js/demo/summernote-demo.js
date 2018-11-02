/*$(document).ready(function () {
    $('.summernote').summernote({
        lang: 'zh-CN'
    });
    //summernote赋值
    $('.summernote').code("123");
    //summernote取值
	var str = $('.summernote').code();
	
});*/

function initMySummernote(summernoteId){
    $('#'+summernoteId).summernote({  
          height: 200,                  
          minHeight: 200,             
          maxHeight: 319,        
          focus: true,   
          lang:'zh-CN', 
          callbacks: {  
            onImageUpload: function(files, editor, $editable) {  
            	sendFile(files, editor, $editable,summernoteId);
            }  
        }   
    });  
  }

function sendFile(files, editor, $editable,summernoteId) {  
    var data = new FormData();  
    data.append("files", files[0]);  
    $.ajax({  
        data : data,  
        type : "POST",  
        url : urlcore + "/api/attachment/upload", //图片上传出来的url，返回的是图片上传后的路径，http格式  
        cache : false,  
        contentType : false,  
        processData : false,  
        dataType : "json",  
        success: function(data) {//data是返回的hash,key之类的值，key是定义的文件名 
             $('#'+summernoteId).summernote('insertImage', data.data[0]); // the insertImage API 
        },  
        error:function(){  
            alert("上传失败");  
        }  
    });  
} 