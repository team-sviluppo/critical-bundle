import { Flex, Button, createStyles, Badge } from '@mantine/core';
import { useEffect, useContext, useState } from 'react';
import CriticalBundleContext from 'context';
import { IconDownload, IconX, IconCheck } from '@tabler/icons-react';
import { useGenerate } from 'hooks';
import { saveAs } from 'file-saver';
import { useClickOutside } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  download: {
    position: 'relative',
    top: 80,
    padding: 10
  },
  notification: {
    position: 'relative',
    padding: 10,
    zIndex: 1000
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

    const refError = useClickOutside(() => setNotificationError(false));
    const refOk = useClickOutside(() => setNotificationOk(false));

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
        setGenerate(null);
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

            <div className={classes.notification}>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}
                >
                    { notificationError ? 
                        (<Badge ref={refError} pr={3} color="red" size="lg" variant="filled">
                            { generateError }
                        </Badge>) :
                        null
                    }

                    { notificationOk ? 
                        (<Badge ref={refOk} pr={3} color="green" size="lg" variant="filled">
                            Download eseguito con successo.
                        </Badge>) :
                        null
                    }
                </Flex>
            </div>

        </div>
  );
}