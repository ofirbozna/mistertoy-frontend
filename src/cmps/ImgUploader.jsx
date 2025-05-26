import { useState, useEffect } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null, setToyToEdit, toyToEdit }) {

    const [toyToEditImg, setToyToEditImg] = useState(toyToEdit.imgUrl)
    const [imgData, setImgData] = useState({ imgUrl: null })
    const [isUploading, setIsUploading] = useState(false)
    console.log(toyToEdit.imgUrl)
    console.log(imgData)

    useEffect(() => {
        setToyToEditImg({ imgUrl: toyToEdit.imgUrl })
    }, [toyToEdit.imgUrl])

    async function uploadImg(ev) {
        ev.preventDefault()
        console.log("🚀 ~ uploadImg ~ ev:", ev)
        setIsUploading(true)

        const { secure_url } = await uploadService.uploadImg(ev)

        setImgData({ imgUrl: secure_url, })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Change picture?'
        return isUploading ? <img src="https://media.tenor.com/axAeNjNIUBsAAAAC/spinner-loading.gif" /> : 'Upload Image'
    }

    return (
        <div className='img-upload'>
            <h3>{getUploadLabel()}</h3>


            <label
                onDrop={uploadImg}
                onDragOver={console.log}>

                <img src={imgData.imgUrl || (toyToEditImg.imgUrl || 'https://res.cloudinary.com/dxptbp9dv/image/upload/v1748199517/Upload-Icon-Logo-PNG-Clipart-Background_hluhoe.png')} />

                <input hidden
                    type="file"
                    onChange={uploadImg} accept="img/*" />
            </label>

        </div>
    )
}









