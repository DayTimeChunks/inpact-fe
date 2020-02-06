import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'

interface IButtonProps {
    onChange: (e: any) => void;
    isMultiFile: boolean;
}

export function ImageButtons(props: IButtonProps) {
  if (props.isMultiFile) {
    return (
      <div className='buttons fadein'>
        <div className=''>
          <label htmlFor='single' className="pl-2">
              <FontAwesomeIcon icon={faImage} color='#3B5998' size='3x' />
          </label>
          <input type='file' id='single' className="btn-sm" name='avatar' onChange={props.onChange} />
        </div>
        <div className='pt-3'>
          <label htmlFor='multi'>
              <FontAwesomeIcon icon={faImages} color='#6d84b4' size='3x' />
          </label>
          <input type='file' id='multi' className="btn-sm" onChange={props.onChange} multiple={true} />
        </div>
    </div>)
  }
  return (
    <div className='buttons fadein'>
      <div className='button'>
          <label htmlFor='single'>
              <FontAwesomeIcon icon={faImage} color='#3B5998' size='3x' />
          </label>
          <input type='file' id='single' onChange={props.onChange} />
      </div>
    </div>)
}
