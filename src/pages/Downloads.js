import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import DownloadManager from '../components/download/DownloadManager';

const Downloads = () => {
    const location = useLocation();
    const { jobId, generatedAssets } = location.state || {};

    return (
        <div className="downloads-layout">
            <Header title="Downloads" />
            <div className="downloads-content">
                <Sidebar />
                <main className="main-content">
                    <DownloadManager generatedAssets={generatedAssets} jobId={jobId} />
                </main>
            </div>
        </div>
    );
};

export default Downloads;
