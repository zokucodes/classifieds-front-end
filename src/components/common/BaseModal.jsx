import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { IconButton } from '@mui/material';


export const BaseModal = React.forwardRef((props, ref) => {
    var { children, isOpen, onClose, heading, bottomElements } = props
    const { gClearItems, isMobile } = useGlobalContext()
    if (!onClose) {
        onClose = gClearItems
    }


    React.useImperativeHandle(ref, () => ({
        onClose: gClearItems
      }));

    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: isMobile ? "100%" : "95%",
        minWidth: isMobile ? "100%" : "50%",
        maxHeight: isMobile ? "100%" : "95%",
        minHeight: isMobile ? "100%" : "50%",
        width: isMobile ? "100%" : "auto",
        height: isMobile ? "100%" : "auto",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    

    

    if (typeof isOpen === 'undefined') {
        isOpen = true
    }

    return (
        <Modal
            ref={ref}
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {
                        heading ? (
                            <>
                                <div className='flex mb-12 w-full flex-row items-center justify-center relative'>

                                    <Typography sx={{ paddingX: 6 }} variant="h4">{heading?.title}</Typography>
                                    <div className='!bg-transparent absolute right-0 m-auto'>
                                        <IconButton onClick={onClose}>
                                            <CloseIcon fontSize="large" />
                                        </IconButton>
                                    </div>

                                </div>
                                {
                                    heading?.subtitle && (
                                        <>
                                            {
                                                typeof heading.subtitle?.text === 'string' ? (
                                                    <Typography
                                                        sx={{ textAlign: heading.subtitle?.align ? heading.subtitle.align : "auto" }}
                                                        variant="h6" fontWeight={"regular"}>{heading.subtitle?.text}</Typography>
                                                ) : (
                                                    heading.subtitle.text
                                                )
                                            }
                                        </>

                                    )
                                }
                            </>

                        ) : (
                            <Typography variant="h4" component="h2">
                                Modal
                            </Typography>
                        )
                    }

                    <div className='w-full h-full mt-4 mb-8'>
                        {
                            children
                        }
                    </div>
                    <div className='mt-auto w-full'>
                        {
                            bottomElements || null
                        }

                    </div>

                </Box>

            </Fade>
        </Modal >
    )

})




// export const BaseModal = ({ children, isOpen, onClose, heading, bottomElements }) => {
//     const { gClearItems, isMobile } = useGlobalContext()
//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         maxWidth: isMobile ? "100%" : "95%",
//         minWidth: isMobile ? "100%" : "50%",
//         maxHeight: isMobile ? "100%" : "95%",
//         minHeight: isMobile ? "100%" : "50%",
//         width: isMobile ? "100%" : "auto",
//         height: isMobile ? "100%" : "auto",
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };


//     if (!onClose) {
//         onClose = gClearItems
//     }

//     if (typeof isOpen === 'undefined') {
//         isOpen = true
//     }

//     return (
//         <Modal

//             open={isOpen}
//             onClose={onClose}
//             closeAfterTransition
//             slots={{ backdrop: Backdrop }}
//             slotProps={{
//                 backdrop: {
//                     timeout: 500,
//                 },
//             }}
//         >
//             <Fade in={open}>
//                 <Box sx={style}>
//                     {
//                         heading ? (
//                             <>
//                                 <div className='flex mb-12 w-full flex-row items-center justify-center relative'>

//                                     <Typography sx={{ paddingX: 6 }} variant="h4">{heading?.title}</Typography>
//                                     <div className='!bg-transparent absolute right-0 m-auto'>
//                                         <IconButton onClick={onClose}>
//                                             <CloseIcon fontSize="large" />
//                                         </IconButton>
//                                     </div>

//                                 </div>
//                                 {
//                                     heading?.subtitle && (
//                                         <>
//                                             {
//                                                 typeof heading.subtitle?.text === 'string' ? (
//                                                     <Typography
//                                                         sx={{ textAlign: heading.subtitle?.align ? heading.subtitle.align : "auto" }}
//                                                         variant="h6" fontWeight={"regular"}>{heading.subtitle?.text}</Typography>
//                                                 ) : (
//                                                     heading.subtitle.text
//                                                 )
//                                             }
//                                         </>

//                                     )
//                                 }
//                             </>

//                         ) : (
//                             <Typography variant="h4" component="h2">
//                                 Modal
//                             </Typography>
//                         )
//                     }

//                     <div className='w-full h-full mt-4 mb-8'>
//                         {
//                             children
//                         }
//                     </div>
//                     <div className='mt-auto w-full'>
//                         {
//                             bottomElements || null
//                         }

//                     </div>

//                 </Box>

//             </Fade>
//         </Modal >
//     )
// }