import { Flex, Button, createStyles, Notification } from '@mantine/core';
import { useEffect, useContext, useState } from 'react';
import CriticalBundleContext from 'context';
import { IconDownload, IconX, IconCheck } from '@tabler/icons-react';
import { useGenerate } from 'hooks';
import { saveAs } from 'file-saver';

const useStyles = createStyles((theme) => ({
  download: {
    position: 'relative',
    top: 260
  }
}));

export function Download() {

    const { classes } = useStyles();
    const { host, urls, screen } = useContext(CriticalBundleContext);
    const [isDownload, setIsDownload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generate, generateError, setGenerate] = useGenerate();
    const [notificationError, setNotificationError] = useState<boolean>(false);
    const [notificationOk, setNotificationOk] = useState<boolean>(false);

    useEffect(() => {
        if (!host || !screen || !urls) {
            setIsDownload(false);
            return
        };
        setIsDownload(true);
    }, [host, urls, screen]);

    useEffect(() => {
        if (!loading) return;
        setGenerate({
          host, 
          urls, 
          screen  
        })
    }, [loading]);

    useEffect(() => {
        if (!generate) return;
        setLoading(false);
        let blob = new Blob([generate], {type: "application/zip"});
        saveAs(blob, "generateCss.zip");
        setNotificationOk(true);
    }, [generate]);

    useEffect(() => {
        if (!generateError) return;
        setLoading(false);
        setNotificationError(true);
    }, [generateError]);

    return (
        <div className={classes.download}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ sm: 'center' }}
            >
                <Button disabled={!isDownload} 
                        leftIcon={<IconDownload size="1rem" />}
                        variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                        loading={loading}
                        onClick={() => setLoading(true)}>
                            Download
                </Button>
            </Flex>

            { notificationError ? 
                (<Notification icon={<IconX size="1.1rem" />} color="red" onClose={()=>setNotificationError(false)}>
                    { generateError }
                </Notification>) :
                null
            }

            { notificationOk ? 
                (<Notification icon={<IconCheck size="1.1rem" />} color="teal" title="Download" onClose={()=>setNotificationOk(false)}>
                    Download eseguito con successo.
                 </Notification>) :
                null
            }
        </div>
  );
}