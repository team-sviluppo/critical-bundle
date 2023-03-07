import { Flex, Button, createStyles, Notification } from '@mantine/core';
import { useEffect, useContext, useState, useCallback } from 'react';
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

    const str2bytes = useCallback((str: any) => {
        var bytes = new Uint8Array(str.length);
        for (var i=0; i<str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }, []);

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
        var blob = new Blob([generate], {type: "application/zip"});
        saveAs(blob, "generateCss.zip");
    }, [generate]);

    useEffect(() => {
        if (!generateError) return;
        setLoading(false);
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

            { generateError ? 
                (<Notification icon={<IconX size="1.1rem" />} color="red">
                    { generateError }
                </Notification>) :
                null
            }

            { generate ? 
                (<Notification icon={<IconCheck size="1.1rem" />} color="teal" title="Download">
                    Download eseguito con successo.
                 </Notification>) :
                null
            }
        </div>
  );
}