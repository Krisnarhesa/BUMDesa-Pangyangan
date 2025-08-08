import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

type DeleteModalProps = {
	open: boolean;
	onOpenChange: (e: boolean) => void;
	onDelete: () => void;
	isLoading: boolean;
};

export default function DeleteModal({ open, onOpenChange, onDelete, isLoading = false }: DeleteModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Apa kamu yakin?</DialogTitle>
					<DialogDescription className='!mt-10 flex items-center gap-3 rounded-lg bg-yellow-100 p-3 text-cyan-600'>
						<AlertCircle size={20} />
						<span>Perubahan ini tidak dapat dikembalikan</span>
					</DialogDescription>
					<DialogFooter className='!mt-10'>
						<Button variant={'ghost'} onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button className='bg-red-500 hover:bg-red-600' disabled={isLoading} onClick={onDelete}>
							Delete Entry
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
