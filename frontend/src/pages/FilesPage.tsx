import { motion } from 'framer-motion'
import { Folder, File, Upload, Download, Trash2, Search } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'

export default function FilesPage() {
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Files</h1>
              <p className="text-dark-400">Browse and manage device files</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search files..."
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Folders */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Folders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Downloads', 'Documents', 'Pictures', 'Music', 'Videos', 'DCIM'].map((folder) => (
                <motion.div
                  key={folder}
                  whileHover={{ scale: 1.05 }}
                  className="glass-dark rounded-xl p-4 card-hover cursor-pointer text-center"
                >
                  <Folder className="w-12 h-12 text-accent-400 mx-auto mb-2" />
                  <p className="text-sm text-white">{folder}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Files */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Recent Files</h2>
            <div className="glass-dark rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-dark-400 font-medium">Name</th>
                    <th className="text-left p-4 text-dark-400 font-medium">Size</th>
                    <th className="text-left p-4 text-dark-400 font-medium">Modified</th>
                    <th className="text-right p-4 text-dark-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'photo_001.jpg', size: '2.4 MB', modified: '2 hours ago' },
                    { name: 'document.pdf', size: '1.2 MB', modified: '5 hours ago' },
                    { name: 'recording.mp3', size: '8.5 MB', modified: '1 day ago' },
                  ].map((file, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <File className="w-5 h-5 text-primary-400" />
                          <span className="text-white">{file.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-dark-400">{file.size}</td>
                      <td className="p-4 text-dark-400">{file.modified}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-dark-400" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
