import { useEffect } from "react"

const BrowserTabTitle = ({ title }) => {
  useEffect(() => {
    
    document.title = title;
  
  }, [title]);

  return null;
}

export default BrowserTabTitle