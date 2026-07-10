import React from 'react'
import Dropzone from 'react-dropzone'
import { UploadIcon } from '@hugeicons/core-free-icons';
import { AppIcon } from '@/components/shared/app-icon';

function UploadDropzone({ handleDrop }: { handleDrop: (files: File[]) => void }) {
  return (
        <Dropzone 
            onDrop={handleDrop}
            multiple={false}
            maxFiles={1}
            accept={{
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
                "image/svg+xml": [".svg"],
            }}
        >
            {({getRootProps, getInputProps}) => (
              <div
                    {...getRootProps()}
                    className="
                        mx-auto
                        flex
                        h-56
                        max-w-5xl
                        items-center
                        justify-center
                        rounded-2xl
                        border-2
                        border-dashed
                        border-border
                        bg-muted/30
                        hover:bg-muted/60
                        px-12
                        transition-colors
                        hover:bg-muted/60
                        cursor-pointer
                    "
                >
                    <div className='align-center flex flex-col items-center justify-center text-center'>
                        <input {...getInputProps()} />

                        <AppIcon
                            icon={UploadIcon}
                            className="mb-5 h-10 w-10 text-muted-foreground"
                        />  
                    
                        <p className="text-xl font-semibold">
                            Drag & drop a template
                        </p>
                    
                        <p className="mt-2 text-muted-foreground">
                            PNG, JPEG or SVG
                        </p>
                    </div>
                </div>
            )}
        </Dropzone>
  )
}

export default UploadDropzone