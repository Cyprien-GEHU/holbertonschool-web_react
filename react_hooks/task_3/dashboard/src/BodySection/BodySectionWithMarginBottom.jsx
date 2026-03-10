import React from "react";
import BodySection from "./BodySection";

class BodySectionWithMarginBottom extends React.Component {
    render() {
        const { title, children } = this.props
        return (
        <div className="bodySectionWithMargin">
            <BodySection title={title} children={children}/>
        </div>
        )
    }
}

export default BodySectionWithMarginBottom