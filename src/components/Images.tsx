import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

interface IImagesProps {
    images: Array<{public_id: string; secure_url: string }>;
    removeImage: (x: string) => void;
}

export class Images extends React.Component<IImagesProps, {}>{

    public render(){
        const {images, removeImage} = this.props;
        console.log("Images on Image component mounted", images)
        return (
            images.map((image, i) => (
                <div key={i} className='fadein'>
                    <div onClick={() => removeImage(image.public_id)} className='delete'>
                        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
                        </div>
                    <img src={image.secure_url} alt='' />
                </div>
        )))
    }
}

/*
* Could not use a stateless component, Typescript JSX was complaining, possible bug.
*
export const Images = (props: IImagesProps) => props.images.map((image, i) =>
    <div key={i} className='fadein'>
        <div
            onClick={() => props.removeImage(image.public_id)}
            className='delete'
        >
            <FontAwesomeIcon icon={faTimesCircle} size='2x' />
        </div>
        <img src={image.secure_url} alt='' />
    </div>
);
* */