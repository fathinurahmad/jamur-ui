"use client" 

import { useState } from "react";
import { Camera, Home, BookOpen, AlertTriangle, Upload, CheckCircle, XCircle, Info } from "lucide-react";

export default function HomePage() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("https://web-production-b4c3a.up.railway.app/predict", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Error: Tidak dapat menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  const renderHome = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-10 h-10 text-green-800" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Deteksi Jamur Beracun</h2>
          <p className="text-gray-600">Upload foto jamur untuk mengetahui apakah aman atau beracun</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
              {previewUrl ? (
                <div className="space-y-4">
                  <img src={previewUrl} alt="Preview" className="max-w-full h-48 object-cover rounded-lg mx-auto" />
                  <p className="text-sm text-gray-600">Gambar siap dianalisis</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-green-600 mx-auto" />
                  <p className="text-gray-600">Pilih gambar jamur</p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full mt-4 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!image || loading}
              className="w-full bg-green-800 hover:bg-green-900 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Menganalisis...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Deteksi Jamur
                </>
              )}
            </button>
          </div>
          {result && (() => {
      const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Info className="w-6 h-6 text-green-800" />
        Hasil Deteksi
      </h3>

      <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-sm text-gray-700">
        <p><span className="font-semibold">Jenis Jamur:</span> {parsedResult.jenis_jamur}</p>
        <p><span className="font-semibold">Status:</span> {parsedResult.status}</p>
        <p><span className="font-semibold">Kepercayaan:</span> {(parsedResult.confidence * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
})()}


          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Tips Penggunaan:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Gunakan foto yang jelas dan terang</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Pastikan jamur terlihat utuh</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Hindari foto yang buram atau gelap</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Jangan konsumsi jamur tanpa kepastian 100%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      


    </div>
  );

  const renderGuide = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Panduan Identifikasi Jamur</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">Jamur Aman</h3>
              </div>
              <ul className="space-y-2 text-green-700">
                <li>• Warna cerah dan konsisten</li>
                <li>• Tidak berlendir atau lengket</li>
                <li>• Aroma tidak menyengat</li>
                <li>• Tumbuh di tempat yang bersih</li>
                <li>• Bentuk yang utuh dan tidak cacat</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-semibold text-red-800">Jamur Beracun</h3>
              </div>
              <ul className="space-y-2 text-red-700">
                <li>• Warna mencolok atau tidak natural</li>
                <li>• Permukaan berlendir</li>
                <li>• Aroma busuk atau aneh</li>
                <li>• Tumbuh di tempat kotor</li>
                <li>• Bentuk yang tidak biasa</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-amber-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                <h3 className="text-xl font-semibold text-amber-800">Peringatan Penting</h3>
              </div>
              <ul className="space-y-2 text-amber-700">
                <li>• Jangan pernah makan jamur liar tanpa kepastian</li>
                <li>• Konsultasi dengan ahli mycology</li>
                <li>• Aplikasi ini hanya bantuan, bukan keputusan final</li>
                <li>• Gejala keracunan bisa muncul berjam-jam kemudian</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-800">Langkah Keamanan</h3>
              </div>
              <ul className="space-y-2 text-blue-700">
                <li>• Selalu cuci tangan setelah menyentuh jamur</li>
                <li>• Jangan biarkan anak-anak bermain dengan jamur liar</li>
                <li>• Simpan foto jamur untuk referensi dokter</li>
                <li>• Hubungi rumah sakit jika merasa tidak enak badan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergency = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Darurat Keracunan Jamur</h2>
          <p className="text-gray-600">Informasi penting saat mengalami keracunan jamur</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Gejala Keracunan</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Mual dan muntah</li>
                <li>• Diare dan kram perut</li>
                <li>• Pusing dan sakit kepala</li>
                <li>• Demam dan kedinginan</li>
                <li>• Kesulitan bernapas</li>
                <li>• Halusinasi (pada kasus tertentu)</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Pertolongan Pertama</h3>
              <ul className="space-y-2 text-amber-700">
                <li>• Segera hubungi rumah sakit</li>
                <li>• Jangan memuntahkan paksa</li>
                <li>• Minum air putih secukupnya</li>
                <li>• Simpan sisa jamur untuk analisis</li>
                <li>• Catat waktu konsumsi jamur</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Nomor Darurat</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Ambulans</p>
                    <p className="text-2xl font-bold text-green-800">118 / 119</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Polisi</p>
                    <p className="text-2xl font-bold text-green-800">110</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Pemadam Kebakaran</p>
                    <p className="text-2xl font-bold text-green-800">113</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Informasi untuk Dokter</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Waktu konsumsi jamur</li>
                <li>• Jumlah yang dikonsumsi</li>
                <li>• Jenis jamur (jika diketahui)</li>
                <li>• Gejala yang dialami</li>
                <li>• Obat yang sudah diminum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">MushroomDetect</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        {activeTab === "home" && renderHome()}
        {activeTab === "guide" && renderGuide()}
        {activeTab === "emergency" && renderEmergency()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "home"
                  ? "text-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Home className={`w-6 h-6 mb-1 ${activeTab === "home" ? "text-green-800" : ""}`} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setActiveTab("guide")}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "guide"
                  ? "text-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <BookOpen className={`w-6 h-6 mb-1 ${activeTab === "guide" ? "text-green-800" : ""}`} />
              <span className="text-xs font-medium">Panduan</span>
            </button>
            
            <button
              onClick={() => setActiveTab("emergency")}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "emergency"
                  ? "text-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <AlertTriangle className={`w-6 h-6 mb-1 ${activeTab === "emergency" ? "text-green-800" : ""}`} />
              <span className="text-xs font-medium">Darurat</span>
            </button>
          </div>
        </div>
      </nav>

     
    </div>
  );
}