import { Image, Flex, createStyles } from '@mantine/core';
import logo from 'assets/logo.png';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'relative',
    top: 40
  }
}));

export function Header() {
    const { classes } = useStyles();

    return (
        <Flex className={classes.header}
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center' }}
        >
            <Image width={180} src={logo} alt={logo} />
        </Flex>
  );
}