export default function Icon({ className,name , ...rest}) { 

    return (
        <div className={className} {...rest}>
            <span className="material-symbols-outlined"> {name} </span>
        </div>
    );

}