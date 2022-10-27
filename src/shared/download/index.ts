import http from '@/api/index';

export const download = url => {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');
  img.setAttribute('crossOrigin', 'Anonymous');
  img.src = url;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d')!;
    context.drawImage(img, 0, 0, img.width, img.height);
    // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
    // saveAs(imageDataUrl, '附件');
    canvas.toBlob(blob => {
      if (blob) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = '测试';
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }, 'image/jpeg');
  };
  img.onerror = e => {
    console.log('e', e);
  };
  // http({
  //   url,
  //   method: 'get',
  // }).then(res => {
  //   saveAs(res, '测试');
  // });
};
function saveAs(data, name) {
  // const urlObject = window.URL || window.webkitURL || window;
  // const export_blob = new Blob([data], { type: 'image/jpeg' });
  // //createElementNS() 方法可创建带有指定命名空间的元素节点。
  // //此方法可返回一个 Element 对象。
  // const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  // save_link.href = urlObject.createObjectURL(export_blob);
  // save_link.download = name;
  // save_link.click();

  const canvas = document.createElement('canvas');
  const img = document.createElement('img');
  img.setAttribute('crossOrigin', 'Anonymous');
  img.src = url;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d')!;
    context.drawImage(img, 0, 0, img.width, img.height);
    // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
    // saveAs(imageDataUrl, '附件');
    canvas.toBlob(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = getFileName(url);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/jpeg');
  };
  img.onerror = e => reject(e);
}
