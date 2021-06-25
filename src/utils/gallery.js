// Gallery
// 数据格式应当满足 [{ width, hight, ... }]
function Gallery({
  list = [], 
  waperWidth, 
  imageHeight, 
  gap = 0,
  thresholdHeight = 10,
  proportionW = 3,
  proportionH = 0.34
}) {
  let newList = [];
  let cacheRow = [];
  let cacheRowWidth = 0;
  let cacheNextWidth = 0;

  const h = imageHeight;

  if (!(list instanceof Array) || !waperWidth || !h) {
    return list;
  }

  const l = list.map(function (v) {
	// var img = new Image();
	// img.src = v.src;
	// if(img.complete) {
	// 	console.log('complete:' + img.width + ':' + img.height);
	// 	v.width = img.width;
	// 	v.height = img.height;
	// } else {
	// 	console.log('notcomplete:')
	// 	img.onload = function() {
	// 		console.log('onload:' + img.width + ',' + img.height)
	// 	}
	// }
    let ratio = v.width / v.height || 1;

    // _reproportion 作为 contain 显示标记
    // _maxW 作为超宽图片标记
    if (ratio > proportionW) {
      v._maxW = ratio;
      ratio - proportionW > 1 && (v._reproportion = ratio);
      ratio = proportionW;
    }

    if (ratio < proportionH) {
      proportionH - ratio < 0.1 && (v._reproportion = ratio);
      ratio = proportionH;
    }

    v._height = h;
    v._width = h * ratio;
    return v;
  });

  l.forEach((v, i, arr) => {
    const nextV = arr[i+1];

    cacheRow.push(v);
    cacheRowWidth += v._width;
    cacheNextWidth = cacheRowWidth + (nextV ? nextV._width: 0);

    if (judgment()) {
      merge()
    }

    if (i === (l.length - 1) && cacheRow.length) {
      merge()
    }
  });

  function merge(real) {
	// console.log(cacheRowWidth)
	// console.log(waperWidth)
    let r = real ? 1 : cacheRowWidth / (waperWidth - gap * cacheRow.length);
	// console.log(r)
    newList = newList.concat(cacheRow.map(item => {
      // 超宽图处理
      // if (cacheRow.length === 1 && item._maxW) {
      //   const rh = item._width/item._maxW;
      //   item._height = rh < h - thresholdHeight ? h: rh;
      // }

	  if(item._width / cacheRowWidth >= 0.8) {
	  	 item.picture = item.pictureHig
		 console.log('enter:' + (item._width / cacheRowWidth))
	  }
	  
      item._width = floor(item._width / r);
	  // console.log(item._height);
      item._height = floor(item._height / r);
	  // console.log(item._height);
	  
      return item;
    }));      
    
    cacheRow = [];
    cacheRowWidth = 0;
  }
  
  // 换行规则
  function judgment() {
    // 当前实际高度
    let curH = (waperWidth - gap * cacheRow.length) / cacheRowWidth * h;
    // 下一个实际高度
    let nextH = (waperWidth - gap * (cacheRow.length + 1)) / cacheNextWidth * h;

    if (
      (
        curH <= h + thresholdHeight
        || nextH <= h - thresholdHeight
      )
      && Math.abs(curH - h) < Math.abs(nextH - h)
    ) {
      return true;
    }

    return false;
  }
  
  function floor (num) {
    return Math.floor(num * 100) / 100;
  }

  return newList;
}

export default Gallery