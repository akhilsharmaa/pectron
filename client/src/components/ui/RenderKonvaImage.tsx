import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export const RenderKonvaImage = (props: {
                                    "imageUrl": string, 
                                    CANVAS_WIDTH:number, 
                                    CANVAS_HEIGHT:number}) => {
    
    const [image] = useImage(props.imageUrl);
    return <KonvaImage 
                image={image} 
                x={(props.CANVAS_WIDTH*0.65)} 
                y={(props.CANVAS_HEIGHT*0.25)}
                height={300}
                width={300}
                cornerRadius={10} 
                cropX={300}
                cropY={100}
                draggable={true} />;
  };