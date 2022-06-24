import React, { useState } from "react";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
  showCount?: boolean;
}

export const Uploader: React.FC<IProps> = (props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const [filesCount, setFilesCount] = useState(0);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();
    setFilesCount(filesCount + event.target.files.length)
    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
        <div className="grid grid-col-1 gap-2 mb-2">
        <button className="rounded-xl border py-2 px-4 text-white bg-slate-900 hover:bg-slate-800" type="button" onClick={onClickHandler}>
          {props.label}
        </button>
        {
          props.showCount && (
            <span className="pr-2 text-sm text-neutral-600 text-right">Uploaded files: {filesCount}</span>
          )
        }
        <input
          accept={props.acceptedFileTypes}
          multiple={props.allowMultipleFiles}
          name={props.uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
        />
    </div>
      </form>
  );
};

Uploader.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: true,
};