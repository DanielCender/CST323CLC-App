import React from 'react';

/**
 * Renders postView page
 * @param Title
 * @param props
 */
export const Title = () => {
    return (
        <div>
            <form>
                <label>
                    EMAIL
                    <input type="text" name="email" />
                </label>
                <label>
                    PASSWORD
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="SUBMIT" />
            </form>
        </div>
    )
};

export default Title;