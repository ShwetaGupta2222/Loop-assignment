import React, { useEffect, useState } from "react";

const GoogleDataStudioMap = ({ restaurantName }) => {
    const embedUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurantName}"}&theme=autumn`;
    // const embedUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2":{"query":{"0":{"type":"TEXT","id":"ds2.name","value":"${restaurantName}"}}}}}&theme=autumn`;
    return (
        <div className="Map">
            <div className="map">
                <iframe
                    src={embedUrl}
                    title={`Chart for ${restaurantName}`}
                    width="100%"
                    height="850"
                    frameBorder="0"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default GoogleDataStudioMap;
