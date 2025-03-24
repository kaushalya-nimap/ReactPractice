import { toast as rht } from 'react-hot-toast';


const defaultOptions = { 
    duration: 1500,
    position: "top-right" 
}

const success = (msg, options = defaultOptions) => {
    return rht.success(msg, options)
}

const error = (msg, options = defaultOptions) => {
    return rht.error(msg, options)
}

const warning = (msg, options = defaultOptions) => {
    return rht(msg, { ...options, icon: '⚠️' })
}

const toast = {
    success,
    error,
    warning
}

export default toast