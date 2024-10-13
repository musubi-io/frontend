import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logo from '../assets/Musubi.png'; // Adjust the path as necessary

export function Header() {
    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">MUSUBI</h1>
                <img src={logo} alt="Logo" className="h-8 w-8" />
            </div>
            <div className="flex items-center space-x-4 pr-4">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                </div>
            </div>
        </header>
    );
}