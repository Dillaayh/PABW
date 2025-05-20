export default function Footer() {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="bg-blue-100 py-8">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="/images/logo.svg"
                alt="Plane and Hotel Icon"
                className="w-16 h-16"
              />
            </div>
            <p className="text-gray-800 max-w-xl text-sm">
              Gebookin adalah platform penyedia pemesanan untuk penerbangan dan kamar hotel di berbagai wilayah seluruh dunia dengan menyediakan banyak pilihan beragam.
            </p>
          </div>
        </div>
        <div className="bg-blue-800 text-white text-center py-4 text-sm">
          Copyright © 2025 GeBookin. All rights reserved
        </div>
      </footer>
    );
  }
  