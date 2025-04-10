import { IconButton, Tooltip } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const SocialShare = ({ recipeTitle }: { recipeTitle: string }) => {
    const handleShare = (platform: string) => {

        console.log(`Shared "${recipeTitle}" on ${platform}`);
    };

    return (
        <div>
            <Tooltip title="Share on Facebook">
                <IconButton onClick={() => handleShare('Facebook')}>
                    <Facebook />
                </IconButton>
            </Tooltip>
            <Tooltip title="Share on Twitter">
                <IconButton onClick={() => handleShare('Twitter')}>
                    <Twitter />
                </IconButton>
            </Tooltip>
            <Tooltip title="Share on Instagram">
                <IconButton onClick={() => handleShare('Instagram')}>
                    <Instagram />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default SocialShare;
