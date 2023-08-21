import { CircularProgress, Grid } from '@mui/material';
import Header from '../../common/Header';
import LeftSidebar from '../../common/LeftSidebar';
import RightSidebar from '../../common/RightSidebar';
import { API } from "../../api";
import { useEffect, useState } from 'react';

const ReportPage = () => {
    const [report, setReport] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        API.generateReport()
            .then((res) => {
                setReport(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const formatXml = (xml) => {
        const formatted = new XMLSerializer().serializeToString(xml);
        return formatted;
    };

    return (
        <div>
            <Header />
            <Grid container spacing={0} style={{ height: '100vh' }}>
                <LeftSidebar />
                <Grid item xs={8}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <pre>{formatXml(new DOMParser().parseFromString(report, 'text/xml'))}</pre>
                    )}
                </Grid>
                <RightSidebar />
            </Grid>
        </div>
    );
}

export default ReportPage;