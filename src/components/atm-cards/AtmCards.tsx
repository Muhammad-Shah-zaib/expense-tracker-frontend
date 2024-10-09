import { IconButton } from "@mui/material";
import AtmCard from "../../shared/cards/AtmCard"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const AtmCards = () => {
  return (
    <div className={`flex flex-col gap-4 px-4 w-full h-full`}>
        <div className={`w-full border-b-2 border-primary flex items-center justify-between`}>
            <div className={`font-medium text-xl`}>Atm Cards</div>
            <div>
                <IconButton>
                    <LibraryAddIcon className="text-tertiary"  />
                </IconButton>
            </div>
        </div>
        <AtmCard />
    </div>
  )
}

export default AtmCards