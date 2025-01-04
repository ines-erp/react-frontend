import {
    AppBar,
    Box, Container, Drawer,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Offset = () => <Box sx={{height: '86px'}}/>


export const LayoutMenuAppbar = () => {
    const isScreenBigger = useMediaQuery('(min-width:600px)');
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const drawerWidth = 240;
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} >
                <Toolbar>
                    <IconButton color='inherit' onClick={handleDrawerToggle} sx={{display: isScreenBigger ? 'none' : 'flex', marginRight:2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 4,
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.6rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        INES
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant={isScreenBigger ? "permanent" : "temporary"}
                    open={isDrawerOpen}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                    }}
                    anchor="left" border={'1px solid red'}>
                <Offset/>
                <ul>
                    <li>menu</li>
                    <li>menu</li>
                    <li>menu</li>
                </ul>
            </Drawer>

            <Container maxWidth={false} id={"main"}>
                <Offset/>
                <Typography>

                    Mauris imperdiet erat id nunc dignissim rutrum. Vestibulum ligula elit, rhoncus in tempus quis,
                    congue a mi. Integer sit amet finibus dolor. Duis pellentesque tortor venenatis magna congue, id
                    lacinia lacus semper. Morbi a lorem placerat, viverra nisl ac, blandit ipsum. Nunc id scelerisque
                    felis. Nullam nec nulla rhoncus, aliquet erat et, dictum eros. Curabitur facilisis aliquam tellus at
                    vulputate. Fusce tempus nisl quis justo elementum, et lacinia nisi dictum. Fusce gravida dignissim
                    velit, eu ornare metus pharetra eget. Quisque eget lorem nec dui sagittis egestas et quis erat.
                    Nullam rhoncus sagittis felis, id convallis felis dignissim nec.

                    Vestibulum maximus tellus vel quam pharetra vulputate. Phasellus maximus, metus a tempus
                    ullamcorper, mauris lorem fringilla est, nec finibus lacus dui quis elit. Pellentesque tincidunt
                    nisl nec magna pharetra consectetur. Vestibulum eleifend dui a pharetra lobortis. Pellentesque sed
                    suscipit felis. Cras sollicitudin augue nec egestas blandit. Praesent pellentesque mi quis diam
                    sollicitudin, eget auctor mauris lobortis. Nullam bibendum metus quis varius egestas. Ut ullamcorper
                    commodo est, ut aliquet tellus volutpat at. Suspendisse sit amet magna et tortor accumsan posuere.
                    Suspendisse congue tristique augue a imperdiet.

                    Etiam cursus non magna venenatis aliquam. Mauris est risus, aliquet nec metus sit amet, rutrum
                    commodo purus. Quisque aliquet, ex vel tincidunt gravida, nibh lectus pharetra enim, id mollis urna
                    diam eu magna. Nulla convallis finibus molestie. Fusce pharetra ligula a ex hendrerit, id sagittis
                    leo semper. Nullam lobortis, urna ac efficitur rutrum, nisi tellus gravida elit, a volutpat velit
                    ligula a metus. Nulla semper felis augue, ut malesuada odio iaculis et. Aliquam erat volutpat. Nam
                    iaculis mauris eu placerat laoreet. Nullam mollis vel metus in varius. Vestibulum purus tortor,
                    posuere et metus at, tincidunt efficitur nibh. Nulla feugiat quam lectus, at egestas lorem rhoncus
                    ac. Suspendisse magna massa, elementum efficitur nisi ut, scelerisque iaculis elit.

                    Fusce semper tempor augue, eu interdum diam gravida in. Curabitur sed est nec leo sollicitudin
                    ultrices. Cras a erat lacus. Maecenas lacus enim, molestie nec suscipit sit amet, faucibus at dolor.
                    Duis dictum velit ac tortor sodales, in ultricies orci finibus. Integer sollicitudin, nulla eu
                    tincidunt elementum, leo leo convallis tellus, sed vehicula tellus mi quis odio. Phasellus non mi
                    nulla. Vivamus porttitor in ipsum ac aliquet. Nullam neque purus, lobortis at sollicitudin id,
                    cursus quis erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae magna a enim
                    euismod porttitor a a odio. Aenean interdum erat non nisl congue tempus. Aliquam auctor purus sit
                    amet tellus dapibus venenatis.

                </Typography>
            </Container>
        </Box>
    )
}