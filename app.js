const body = document.querySelector('body');
let galleryEl;
let allData;

export const render = data => {
    if (data.rows) {
        initiateGallery(body);
        getData(data);
    } else {
        // display message
        console.error('No videos available to display');
    }
};

const initiateGallery = parentEl => {
    galleryEl = document.createElement('div');
    galleryEl.className = ('gallery');
    parentEl.appendChild(galleryEl);
}

export const getData = data => {
    allData = data;
    setRows(data.rows || []);

    // set billboard-inline
}

const setRows = rows => {
    for (let i = 0; i < rows.length; i++) {
        rows[i].length === 1 ? createBillboardRow(...rows[i], i) : createBoxshotRow(rows[i]);
    }
}

const createBillboardRow = (videoId, rowIndex) => {
    const billboardMetadata = allData.billboards.find(bb => bb.row === rowIndex);
    billboardMetadata.id = videoId;
    console.log('billboardMetadata', billboardMetadata);

    // .row-billboard
    const billboardRowEl = document.createElement('div');
    billboardRowEl.className = 'row-billboard';
    
    // .billboard-background
    const billboardBgEl = getBoxShotImg(billboardMetadata.id);
    billboardBgEl.className = 'billboard-background';

    const billboardMdEl = document.createElement('div');
    billboardMdEl.className = 'billboard-metadata';
    
    const billboardMdLogoEl = document.createElement('div');
    billboardMdLogoEl.className = 'billboard-metadata-logo';
    
    // for each button in array
    // const billboardMdBtnEl = document.createElement('button');
    // billboardMdBtnEl.className = 'billboard-metadata-button';
    billboardRowEl.appendChild(billboardBgEl)
    galleryEl.appendChild(billboardRowEl);
    galleryEl.appendChild(billboardMdEl);
    galleryEl.appendChild(billboardMdLogoEl);

}

const createBoxshotRow = row => {
    const boxShotRowEl = document.createElement('div');
    boxShotRowEl.className = 'row-videos';

    galleryEl.appendChild(boxShotRowEl);
    setBoxshots(row, boxShotRowEl);
}

const setBoxshots = (row, el) => {
    for (let i = 0; i < row.length; i++) {
        const videoId = row[i];
        const boxshotToAppend = createBoxshot(videoId);
        el.appendChild(boxshotToAppend);
    }
}

const createBoxshot = videoId => {
    const boxshotEl = document.createElement('div');
    boxshotEl.className = 'boxshot';
    boxshotEl.appendChild(getBoxShotImg(videoId));
    return boxshotEl;
}

const getBoxShotImg = id => {
    const videoMetadata = allData.videos.find(video => video.id === id);
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', videoMetadata.boxart);
    imgEl.setAttribute('alt', videoMetadata.title);
    return imgEl;
}

// fn's for billboard and billboard-inline
// cleanup