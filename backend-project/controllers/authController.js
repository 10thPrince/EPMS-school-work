import { getDB } from "../config/db.js";


//@desc login user
//@route POST /user/login
//@access Public
export const login =  (req, res) => {
    try {
        const db = getDB();

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields"
            })
        }

        const query = 'select * from users where username = ?';

        db.query(query, [username], (err, result) => {
            if (err) return res.status(200).json(err);

            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username'
                })
            }

            const user = result[0];

            if (password !== user.password) {
                return res.status(400).json({
                    success: false,
                    message: "Incorect Password!"
                })
            }

            req.session.user = {
                id: user.id,
                username: user.username
            }

            res.status(200).json({
                success: true,
                message: 'Login successfull!'
            })
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'System Error!',
            error: err
        })
        console.log(err);
    }
}

export const logout = async (req, res) => {
    try {
        if (req.session.user) {
            await req.session.destroy(() => {
                return res.status(200).json({
                    success: true,
                    message: "Logout successful !!!"
                })
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No logout bcs no user found logged In !"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'System Error!',
            error: err
        })
        console.log(err);
    }
}

export const checkAuth = (req, res) => {

    try {
        if (req.session.user) {
            return res.status(200).json({ loggedIn: true, user: req.session.user });
        }
        res.status(200).json({ loggedIn: false });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'System Error!',
            error: err
        })
        console.log(err);
    }
};