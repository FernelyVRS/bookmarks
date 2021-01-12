import {useState, useEffect} from 'react'

import { db } from '../firebase';
import { toast } from 'react-toastify'


const LinkForm = (props) =>{

    const initialStateValues = {
        url: '',
        webname: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const {name, value}= e.target
        //console.log(name, value);
        setValues({...values, [name]: value})
    }

    const validationUrl = str =>{
          return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);

    }

    const handleSubmit = e => {
        e.preventDefault();

        if(!validationUrl(values.url)){
            return toast('Link invalidate', {
                type: 'warning',
                autoclose: 2000
              })
        }

        props.addOrEdit(values);
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) => {
        const doc = await db.collection("link").doc(id).get();
        setValues({...doc.data()});
    }

    useEffect(() => {
        if (props.currentId === ""){
            setValues({ ...initialStateValues});
        } else {
            getLinkById(props.currentId)   
        }
        // eslint-disable-next-line
    }, [props.currentId]);

    return (
         <form onSubmit={handleSubmit} autoComplete="off">
            <div className="text-white pb-1">
                <div className="max-w-md mx-auto pt-8">
                    <div className="bg-gray-800 p-5 rounded-xl shadow-lg m-2 border border-green-800">
                        
                        <div className="relative top-1">
                            <div className="absolute flex left-0 top-0 h-full w-10 bg-gray-500 ">
                                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-500 text-gray-50 text-lg h-full w-full">
                                    <i className="material-icons">link</i>
                                </div>
                            </div>
                            <input name="url" type="text" onChange={handleInputChange} value={values.url} placeholder="https://someurl.com"  className="relative w-full rounded-sm placeholder-gray-400 text-gray-200 py-2  px-4 pl-12 bg-gray-700 focus:outline-none focus:ring-green-600 focus:ring" />
                        </div>

                        <div className="relative top-1 mt-6 block">
                            <div className="absolute flex left-0 top-0 h-full w-10 bg-gray-500 ">
                                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-500 text-gray-50 text-lg h-full w-full">
                                    <i className="material-icons">edit</i>
                                </div>
                            </div>
                            <input name="webname" type="text" onChange={handleInputChange} value={values.webname} placeholder="Website name"  className="relative w-full rounded-sm placeholder-gray-400 text-gray-200 py-2  px-4 pl-12 bg-gray-700 focus:outline-none focus:ring-green-600 focus:ring" />
                        </div>
                        
                        <textarea name="description" type="text" onChange={handleInputChange} value={values.description} placeholder="Description" className="mt-6 px-4 py-2 bg-gray-700 border-0 rounded-sm w-full text-gray-200 focus:outline-none focus:ring-green-600 focus:ring" />
                        
                        <button className="uppercase font-semibold tracking-wider w-full bg-green-600 text-green-50 mt-5 py-3 rounded-sm focus:outline-none">{props.currentId === '' ? 'Create': 'update'}</button>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default LinkForm;