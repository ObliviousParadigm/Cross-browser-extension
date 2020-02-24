remote: something that's not on your computer
origin tracks from the repository that has been cloned
URL is the origin

git push origin master
syncs local repo and repo on server

git pull
sync from remote repo

git push
sync to remote repo

fork on github
make an instance for you to modify

Clone the fork, now you have it on your system, you can make changes

git status 
show the files that have been changed, untracked files, etc.

untracked file
on your local system, not on the REMOTE repo 

git add <filename>

git commit 
commit is basically a change on your local system 

git push origin <branchName>
push changes made in branchName 

master 
it is the clean copy of the repo 

git remote add <newRemoteName anything but origin> <repoURL>
making another remote

git pull <newRemoteName> master
syncing their repo with your local repo 

git pull --rebase <remoteName> <branchName>
goes down the tree, finds the first common commit, and whatever commit has been done to the remote will be added, then your local changes will be added 

git stash
if you've made changes but haven't commited them
all the changes that haven't been commited will be made into a copy and removed from that branch
now go to branch you're supposed to be in 
then do 
git checkout <branchName> 
git stash apply 
it applies all the changes into the chosen branch 



Javascript
single threaded
promises
