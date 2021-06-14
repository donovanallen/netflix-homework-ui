const body = document.querySelector('body');
let galleryEl;
let allData;

const billboardTypes = [
    {
        type: 'header',
        create(metadata, bgEl, mdEl, bbrEl) {
            const videoMetadata = allData.videos.find(video => video.id === metadata.id);
            const billboardRowEl = bbrEl;
            const metadataEl = mdEl;
            const backgroundImgEl = bgEl;
            
            // .billboard-background
            backgroundImgEl.setAttribute('src', videoMetadata.background);
            backgroundImgEl.setAttribute('alt', videoMetadata.title);
            
            // .billboard-metadata-synopsis
            const metadataSynopsisEl = document.createElement('p');
            metadataSynopsisEl.innerHTML = videoMetadata.synopsis
            metadataSynopsisEl.className = 'billboard-metadata-synopsis';
            metadataEl.appendChild(metadataSynopsisEl);

            if (metadata.buttons) {
                for (let i = 0; i < metadata.buttons.length; i++) {
                    const buttonConfigs = metadata.buttons[i];
                    metadataSynopsisEl.insertAdjacentElement('afterend', createButtonEl(buttonConfigs));
                }
            }
            
            billboardRowEl.appendChild(backgroundImgEl);
            billboardRowEl.appendChild(metadataEl);
            galleryEl.appendChild(billboardRowEl);
        }
    },
    {
        type: 'inline',
        create(metadata, bgEl, mdEl, bbrEl) {
            const videoMetadata = allData.videos.find(video => video.id === metadata.id);
            const billboardRowEl = bbrEl;
            const metadataEl = mdEl;
            const backgroundImgEl = bgEl;
            
            billboardRowEl.classList.add('row-billboard-inline');
            
            backgroundImgEl.setAttribute('src', videoMetadata.backgroundShort);
            backgroundImgEl.setAttribute('alt', videoMetadata.title);

            if (metadata.buttons) {
                for (let i = 0; i < metadata.buttons.length; i++) {
                    const buttonConfigs = metadata.buttons[i];
                    metadataEl.append(createButtonEl(buttonConfigs));
                }
            }
            
            billboardRowEl.appendChild(backgroundImgEl);
            billboardRowEl.appendChild(metadataEl);
            galleryEl.appendChild(billboardRowEl);            
        }
    },
]

export const render = data => {
    if (data.rows) {
        initiateGallery(body);
        setData(data);
    } else {
        console.error('No videos available to display');
    }
};

const initiateGallery = parentEl => {
    galleryEl = document.createElement('div');
    galleryEl.className = ('gallery');
    parentEl.appendChild(galleryEl);
}

const setData = data => {
    allData = data;
    setRows(data.rows);
}

const setRows = rows => {
    for (let i = 0; i < rows.length; i++) {
        rows[i].length === 1 ? createBillboardRow(...rows[i], i) : createBoxshotRow(rows[i]);
    }
}

const createButtonEl = buttonConfigs => {
    const metadataBtnEl = document.createElement('button');
    metadataBtnEl.innerText  = buttonConfigs.text;
    metadataBtnEl.className = 'billboard-metadata-button';
    if (buttonConfigs.type === 'play') {
        metadataBtnEl.classList.add('billboard-metadata-button-play');
    }
    return metadataBtnEl;
}

const createBillboardRow = (videoId, rowIndex) => {
    const billboardMetadata = allData.billboards.find(bb => bb.row === rowIndex);
    const videoMetadata = allData.videos.find(video => video.id === videoId);
    billboardMetadata.id = videoId;

    const billboardRowEl = document.createElement('div');
    billboardRowEl.className = 'row-billboard';
    const backgroundImgEl = document.createElement('img');
    backgroundImgEl.className = 'billboard-background';
    const metadataEl = document.createElement('div');
    metadataEl.className = 'billboard-metadata';
    const metadataLogoEl = document.createElement('img');
    metadataLogoEl.className = 'billboard-metadata-logo'

    metadataLogoEl.setAttribute('src', videoMetadata.logo);
    metadataLogoEl.setAttribute('alt', `${videoMetadata.title} logo`);

    metadataEl.appendChild(metadataLogoEl);
    return billboardTypes.find(bb => bb.type === billboardMetadata.type)?.create(billboardMetadata, backgroundImgEl, metadataEl, billboardRowEl);
}

const createBoxshotRow = row => {
    if (row.length) {
        const boxShotRowEl = document.createElement('div');
        boxShotRowEl.className = 'row-videos';
        galleryEl.appendChild(boxShotRowEl);
        setBoxshots(row, boxShotRowEl);
    }
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

const getBoxShotImg = videoId => {
    const videoMetadata = allData.videos.find(video => video.id === videoId);
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', videoMetadata.boxart);
    imgEl.setAttribute('alt', videoMetadata.title);
    return imgEl;
}